import Logo from '@/components/template/Logo'
import { useThemeStore } from '@/store/themeStore'
import appConfig from '@/configs/app.config'
import { Link } from 'react-router'
import { useAuth } from '@/auth'

const HeaderLogo = ({ mode }) => {
    const defaultMode = useThemeStore((state) => state.mode)
    const { user } = useAuth()

    return (
        <Link to={appConfig.authenticatedEntryPath[user.authority[0]]}>
            <Logo
                imgClass="max-h-10"
                mode={mode || defaultMode}
                className="hidden lg:block"
            />
        </Link>
    )
}

export default HeaderLogo
