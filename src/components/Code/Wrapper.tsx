import React from 'react'

interface IWrapperProps {
    code: string
}

export const Wrapper = (props: IWrapperProps) => <code>{props.code}</code>
