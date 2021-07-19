<<<<<<< HEAD
import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommon'

export function ProfielSidebar(props) {
    return (
      <Box as='aside'>
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr/>
        <AlurakutProfileSidebarMenuDefault/>
      </Box>
    )
=======
import Box from '../Box';
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommon'

export function ProfielSidebar(props) {
    return (
      <Box as='aside'>
        <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
        <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
            @{props.githubUser}
          </a>
        </p>
        <hr/>
        <AlurakutProfileSidebarMenuDefault/>
      </Box>
    )
>>>>>>> ad1a0879c173aafc5c099574361731686811d86e
  }