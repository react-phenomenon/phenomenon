import { Cmd, Console, Expand, Output, Swap, SwapItem } from '@phenomenon/slides'
import { Text, Title } from '@phenomenon/theme-storm'
import React, { FC } from 'react'

export const ConsoleExample: FC = () => {
    let i = 1
    return (
        <>
            <Title>Console</Title>
            <Swap unwrap>
                <SwapItem out={3}>
                    <Text>Lets try remove /dev/null!</Text>
                </SwapItem>
                <SwapItem in={3} out={4}>
                    <Text>Don&apos;t work…</Text>
                </SwapItem>
                <SwapItem in={4} out={6}>
                    <Text>Simple ls it&apos;s still nice!</Text>
                </SwapItem>
                <SwapItem in={6}>
                    <Text>
                        Soo long output! <br /> But it&apos;s still ok
                    </Text>
                </SwapItem>
            </Swap>
            <Expand in={1}>
                <Console unwrap>
                    <Cmd in={++i} name="rm -rf /dev/null" />
                    <Output
                        in={++i}
                        text="rm: cannot remove '/dev/null': No such file or directory"
                    />
                    <Cmd in={++i} name="ls -l /home/root/Projects/Phenomenon" />
                    <Output
                        in={++i}
                        text={`
                        total 568
                        root   4096 maj 28 01:19 build
                        root  36864 cze  5 23:24 node_modules
                        root   1661 cze  5 23:24 package.json
                        root   4096 lut 13 15:36 public
                        root     12 mar 16 13:23 README.md
                    `}
                    />
                    <Output
                        in={++i}
                        text={`
                        root   4096 cze  3 02:07 scripts
                        root   4096 maj 23 00:40 src
                        root    703 cze  5 23:46 tsconfig.json
                        root 499238 cze  5 23:24 yarn.lock
                    `}
                    />
                </Console>
            </Expand>
        </>
    )
}
