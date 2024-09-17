import type { ActorProps, DescriptionProps } from './types'
import styled from '@emotion/styled'
import { ComponentType, useCallback, useMemo, useState } from 'react'
import { Text, Button, Modal, Link, Banner, Card } from '@shopify/polaris'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { parseAndFormatTime } from '@glocurrency/time'
import { faRobot } from '@fortawesome/free-solid-svg-icons'
import { useGetEventsFor } from '../../hooks/timeline'
import { BasicEventData } from '../../types'
import HighlightJson from '../HighlightJson'
import LoadingCard from '../LoadingCard'

const HeadingWrapper = styled.div`
  align-items: center;
  border-bottom: 0.0625rem solid var(--p-border-subdued);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 1.25rem;
  padding: 1.25rem;
`

const TimelineWrapper = styled.div`
  position: relative;
  z-index: 4;
  &:after {
    background: var(--p-border-subdued, #dfe3e8);
    bottom: 0;
    content: '';
    left: 2.15625rem;
    position: absolute;
    top: 0;
    width: 0.1875rem;
    z-index: 1;
  }
`

const TimelineList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const TimelineListItem = styled.li`
  break-inside: avoid-page;
  position: relative;
`

const TimelineDot = styled.div`
  background-color: var(--p-icon-highlight, #006fbb);
  border: 3px solid var(--p-background, #dfe3e8);
  border-radius: 100%;
  flex-shrink: 0;
  height: 1.1875rem;
  margin-left: 1.65625rem;
  margin-right: 1rem;
  width: 1.1875rem;
  z-index: 2;
`

const TimelineTime = styled.div`
  align-self: flex-start;
  color: var(--p-text-subdued, #637381);
  margin-right: 1.25rem;
  white-space: nowrap;
`

const TimelineMessage = styled.p`
  flex: 1 1 auto;
  padding-right: 1rem;
  word-break: break-word;
`

const TimelineExtra = ({
  prev,
  current,
}: {
  prev?: string
  current?: string
}) => {
  const [open, setOpen] = useState(false)

  const prevJson = useMemo(
    () => JSON.stringify(prev?.replaceAll('\\"', '"'), null, 2),
    [prev],
  )
  const currentJson = useMemo(
    () => JSON.stringify(current?.replaceAll('\\"', '"'), null, 2),
    [current],
  )

  const handleOpen = useCallback(() => setOpen(!open), [open])

  if (!prev && !current) {
    return null
  }

  return (
    <>
      <Button variant="monochromePlain" onClick={handleOpen}>
        More info
      </Button>
      <Modal title="Additional information" open={open} onClose={handleOpen}>
        <Modal.Section>
          {prev && (
            <Card>
              <Text as="h2" variant="headingSm">
                Previous Data
              </Text>
              <HighlightJson json={prevJson} />
            </Card>
          )}
          {current && (
            <Card>
              <Text as="h2" variant="headingSm">
                Data
              </Text>
              <HighlightJson json={currentJson} />
            </Card>
          )}
        </Modal.Section>
      </Modal>
    </>
  )
}

const DefaultActor = ({ actorType }: ActorProps) => {
  if (actorType === 'SERVER') {
    return (
      <Text as="span">
        <FontAwesomeIcon icon={faRobot} />
      </Text>
    )
  }

  return (
    <Text as="span" tone="subdued">
      Unknown
    </Text>
  )
}

const DefaultDesctiption = ({ eventType }: DescriptionProps) => {
  return (
    <span>
      performed <b>{eventType}</b> action.
    </span>
  )
}

const Timeline = ({
  app,
  targetType,
  targetId,
  actorComponent,
  descriptionComponent,
}: {
  app: string
  targetType: string
  targetId: string
  actorComponent?: ComponentType
  descriptionComponent?: ComponentType
}) => {
  const { response, isLoading, isError, mutate } = useGetEventsFor(
    app,
    targetType,
    targetId,
  )

  const prepared = useMemo(() => {
    const result: { [key: string]: BasicEventData[] } = {}
    const items = response?.data ? response.data : []

    for (const t of items) {
      const day = new Date(t.timestamp).toUTCString().substring(0, 16)

      if (!(day in result)) {
        result[day] = []
      }

      result[day].push(t)
    }

    return result
  }, [response?.data])

  const Actor = actorComponent ?? DefaultActor
  const Description = descriptionComponent ?? DefaultDesctiption

  return (
    <div>
      <HeadingWrapper>
        <Text variant="headingMd" as="h2">
          Timeline
        </Text>
        <Link removeUnderline onClick={() => mutate(undefined, true)}>
          Refresh
        </Link>
      </HeadingWrapper>
      <div style={{ position: 'relative' }}>
        {isError && !isLoading && (
          <Banner tone="warning" title="Cannot load timeline" />
        )}
        <TimelineWrapper>
          <div>
            <TimelineList>
              {Object.keys(prepared).map(day => {
                return (
                  <TimelineListItem key={day}>
                    <div
                      style={{
                        marginLeft: '3.9rem',
                        marginBottom: '1rem',
                        color: 'var(--p-text-subdued, #637381)',
                        textTransform: 'uppercase',
                      }}
                    >
                      <span>{day}</span>
                    </div>
                    <div
                      style={{
                        marginBottom: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      {prepared[day].map((t: BasicEventData) => (
                        <div
                          key={t.actorId}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginBottom: '1rem',
                          }}
                        >
                          <TimelineDot />
                          <TimelineMessage>
                            <Actor
                              actorId={t.actorId}
                              actorType={t.actorType}
                            />
                            {` `}
                            <Description eventType={t.eventType} />
                            {` `}
                            <TimelineExtra
                              prev={t.prevPayload}
                              current={t.payload}
                            />
                          </TimelineMessage>
                          <TimelineTime>
                            {parseAndFormatTime(t.timestamp)}
                          </TimelineTime>
                        </div>
                      ))}
                    </div>
                  </TimelineListItem>
                )
              })}
              {Object.keys(prepared).length === 0 && (
                <Text as="p" tone="subdued" alignment="center">
                  No events found.
                </Text>
              )}
            </TimelineList>
          </div>
        </TimelineWrapper>
        {isLoading && !isError && <LoadingCard />}
      </div>
    </div>
  )
}

export default Timeline
