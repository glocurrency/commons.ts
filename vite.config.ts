import react from '@vitejs/plugin-react'
import browserslist from 'browserslist'
import dynamicImport from 'vite-plugin-dynamic-import';
import { resolveToEsbuildTarget } from 'esbuild-plugin-browserslist'
import { readPackage } from 'read-pkg'
import { type UserConfig, defineConfig } from 'vitest/config'

const pkg = await readPackage()

const externalPkgs = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.optionalDependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const external = (id: string) => {
  const match = (dependency: string) => new RegExp(`^${dependency}`).test(id)
  const isExternal = externalPkgs.some(match)
  const isBundled = pkg.bundleDependencies?.some(match) // alias of bundledDependencies package.json field array

  return isExternal && !isBundled
}

const targets = resolveToEsbuildTarget(
  browserslist('defaults', {
    ignoreUnknownVersions: false,
  }),
  {
    printUnknownTargets: false,
  },
)

export const defaultConfig: UserConfig = {
  build: {
    outDir: 'dist',
    target: [...targets],
    minify: false,
    lib: {
      name: pkg.name,
      entry: 'src/index.ts',
      formats: ['cjs'], // 'es' removed
      fileName: (format, filename) => {
        if (format === 'es') {
          return `${filename}.js`
        }

        return `${filename}.${format}`
      },
    },
    rollupOptions: {
      preserveSymlinks: true,
      external,
      output: {
        interop: 'compat',
        preserveModules: true,
        preserveModulesRoot: './src',
      },
    },
  },
  plugins: [
    react({
      jsxRuntime: 'automatic',
    }),
    dynamicImport(),
  ],
  test: {
    name: 'lib',
    globals: true,
    clearMocks: true,
    restoreMocks: true,
    mockReset: true,
    environment: 'node',
    setupFiles: ['vitest-localstorage-mock'],
    server: {
      deps: {
        inline: true,
      },
    },
    allowOnly: false,
    css: true,
    logHeapUsage: true,
    reporters: ['default', 'junit'],
    outputFile: {
      junit: '.reports/tests.xml',
    },
    exclude: [
      '**/node_modules/**',
      '**/{dist,build}/**',
      '**/__stories__/**',
      '**.stories.*',
      '**/coverages/**',
      '**/__stories__/**',
      '**/.{idea,git,cache,output,temp,reports,jest}/**',
    ],
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'cobertura', 'html', 'json-summary'],
      exclude: [
        '.reports/**',
        '**/.eslintrc.*',
        '**/*.d.ts',
        'build',
        'dist',
        'node_modules',
        '**/{webpack,vite,vitest,babel}.config.*',
        '**.snap',
        '**/__stories__/**',
        '**.svg',
      ],
    },
  },
}

export default defineConfig(defaultConfig)
