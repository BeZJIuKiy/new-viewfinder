import * as PortsActionCreators from "./ports"
import * as AuthActionCreators from "./auth"

export default {
	...PortsActionCreators,
	...AuthActionCreators,
}