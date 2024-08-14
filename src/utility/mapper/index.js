import HomeActiveIcon from '../../assets/icons/home-active.svg';
import HomeIcon from '../../assets/icons/home.svg';
import RequestActiveIcon from '../../assets/icons/new-req-active.svg';
import RequestIcon from '../../assets/icons/new-req.svg';
import RecentActiveIcon from '../../assets/icons/recent-active.svg';
import RecentIcon from '../../assets/icons/recents.svg';
import ProfileActiveIcon from '../../assets/icons/me-active.svg';
import ProfileIcon from '../../assets/icons/me.svg';

export const tabBarIconMapper = {
  homeStack: {
    active: HomeActiveIcon,
    inactive: HomeIcon,
  },
  requestStack: {
    active: RequestActiveIcon,
    inactive: RequestIcon,
  },
  recentStack: {
    active: RecentActiveIcon,
    inactive: RecentIcon,
  },
  profileStack: {
    active: ProfileActiveIcon,
    inactive: ProfileIcon,
  },
};

export const tabBarVisibilityMapper = {
  homeStack: 'flex',
  requestStack: 'flex',
  recentStack: 'flex',
  profileStack: 'flex',
  projectDetails: 'none',
  'photo-editor': 'none',
  note: 'none',
  uploadPhoto: 'none',
  markUnavailability: 'none',
  notification: 'none',
  activeProject: 'none',
  camera: 'none',
  mediaPage: 'none',
  document: 'none',
};
