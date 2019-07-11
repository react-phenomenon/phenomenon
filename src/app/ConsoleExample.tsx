import React, { FC } from 'react'
import { Console, Cmd, Output } from '../components/Console'
import { Title } from '../themes/storm'

export const ConsoleExample: FC = () => {
    let i = 0
    return (
        <>
            <Title>Console</Title>
            <Console>
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
        </>
    )
}
