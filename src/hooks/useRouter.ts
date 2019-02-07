import { useContext } from 'react'
import { RouteComponentProps, StaticContext } from 'react-router'
import * as History from 'history'
const RouterContext = require('react-router').__RouterContext

// _FIXME_:  use official API when https://github.com/ReactTraining/react-router/pull/6453 merged

export function useRouter<
    Params extends { [K in keyof Params]?: string } = {},
    C extends StaticContext = StaticContext,
    S = History.LocationState
>() {
    return useContext(RouterContext) as RouteComponentProps<Params, C, S>
}
