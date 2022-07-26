import ForumIcon from '@mui/icons-material/Forum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import { Person } from '@mui/icons-material';

const navList = [
    {
        text:'Dashboard',
        link:'/dashboard',
        icon:DashboardIcon,
    },
    {
        text:'Team Members',
        link:'/team-members',
        icon:Person
    },
    {
        text:'Sugggestion Box',
        link:'/home',
        icon:ForumIcon,
    },
    {
        text:'Settings',
        link:'/settings',
        icon:SettingsIcon,
    },
]

export default navList
