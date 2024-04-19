// install (please try to align the version of installed @nivo packages)
// yarn add @nivo/line
import { ResponsiveLine } from '@nivo/line'

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MyResponsiveLine = () => (
    <ResponsiveLine
        data={[
            {
              "id": "japan",
              "color": "hsl(155, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 2
                },
                {
                  "x": "helicopter",
                  "y": 270
                },
                {
                  "x": "boat",
                  "y": 73
                },
                {
                  "x": "train",
                  "y": 21
                },
                {
                  "x": "subway",
                  "y": 130
                },
                {
                  "x": "bus",
                  "y": 128
                },
                {
                  "x": "car",
                  "y": 268
                },
                {
                  "x": "moto",
                  "y": 173
                },
                {
                  "x": "bicycle",
                  "y": 149
                },
                {
                  "x": "horse",
                  "y": 120
                },
                {
                  "x": "skateboard",
                  "y": 189
                },
                {
                  "x": "others",
                  "y": 220
                }
              ]
            },
            {
              "id": "france",
              "color": "hsl(296, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 259
                },
                {
                  "x": "helicopter",
                  "y": 111
                },
                {
                  "x": "boat",
                  "y": 184
                },
                {
                  "x": "train",
                  "y": 37
                },
                {
                  "x": "subway",
                  "y": 37
                },
                {
                  "x": "bus",
                  "y": 118
                },
                {
                  "x": "car",
                  "y": 157
                },
                {
                  "x": "moto",
                  "y": 290
                },
                {
                  "x": "bicycle",
                  "y": 299
                },
                {
                  "x": "horse",
                  "y": 30
                },
                {
                  "x": "skateboard",
                  "y": 294
                },
                {
                  "x": "others",
                  "y": 291
                }
              ]
            },
            {
              "id": "us",
              "color": "hsl(353, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 5
                },
                {
                  "x": "helicopter",
                  "y": 128
                },
                {
                  "x": "boat",
                  "y": 258
                },
                {
                  "x": "train",
                  "y": 220
                },
                {
                  "x": "subway",
                  "y": 113
                },
                {
                  "x": "bus",
                  "y": 172
                },
                {
                  "x": "car",
                  "y": 223
                },
                {
                  "x": "moto",
                  "y": 245
                },
                {
                  "x": "bicycle",
                  "y": 269
                },
                {
                  "x": "horse",
                  "y": 124
                },
                {
                  "x": "skateboard",
                  "y": 184
                },
                {
                  "x": "others",
                  "y": 53
                }
              ]
            },
            {
              "id": "germany",
              "color": "hsl(68, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 169
                },
                {
                  "x": "helicopter",
                  "y": 199
                },
                {
                  "x": "boat",
                  "y": 14
                },
                {
                  "x": "train",
                  "y": 168
                },
                {
                  "x": "subway",
                  "y": 106
                },
                {
                  "x": "bus",
                  "y": 225
                },
                {
                  "x": "car",
                  "y": 95
                },
                {
                  "x": "moto",
                  "y": 217
                },
                {
                  "x": "bicycle",
                  "y": 37
                },
                {
                  "x": "horse",
                  "y": 119
                },
                {
                  "x": "skateboard",
                  "y": 9
                },
                {
                  "x": "others",
                  "y": 151
                }
              ]
            },
            {
              "id": "norway",
              "color": "hsl(153, 70%, 50%)",
              "data": [
                {
                  "x": "plane",
                  "y": 150
                },
                {
                  "x": "helicopter",
                  "y": 27
                },
                {
                  "x": "boat",
                  "y": 139
                },
                {
                  "x": "train",
                  "y": 276
                },
                {
                  "x": "subway",
                  "y": 113
                },
                {
                  "x": "bus",
                  "y": 110
                },
                {
                  "x": "car",
                  "y": 295
                },
                {
                  "x": "moto",
                  "y": 171
                },
                {
                  "x": "bicycle",
                  "y": 70
                },
                {
                  "x": "horse",
                  "y": 252
                },
                {
                  "x": "skateboard",
                  "y": 233
                },
                {
                  "x": "others",
                  "y": 248
                }
              ]
            }
          ]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'transportation',
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        colors={{ scheme: 'nivo' }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
    />
)

export default MyResponsiveLine;