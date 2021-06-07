import { h } from "preact";

import Video from "./icons-svg/video";
import Read from "./icons-svg/read";
import Fitness from "./icons-svg/fitness";
import Application from "./icons-svg/application";
import Gamepad from "./icons-svg/gamepad";
import OnlineCourse from "./icons-svg/online-course";
import OnlineLearning from "./icons-svg/online-learning";
import EmptyBox from "./icons-svg/empty-box";
import ChevronRight from "./icons-svg/chevron-right";
import ChevronBottom from "./icons-svg/chevron-bottom";
import RatingStar from "./icons-svg/rating-star";
import WebinarNoData from "./icons-svg/webinar-no-data";
import MailIcon from "./icons-svg/mail-icon";
import PrivateIcon from "./icons-svg/private-icon";
import LockIcon from "./icons-svg/lock-icon";
import Accepted from "./icons-svg/accepted";
import Camera from "./icons-svg/camera";
import Settings from "./icons-svg/settings";
import EditPen from "./icons-svg/edit-pen";
import EditSocial from "./icons-svg/edit-social";
import EditInfo from "./icons-svg/edit-info";
import EditEdu from "./icons-svg/edit-edu";
import VkIcon from "./icons-svg/vk-icon";
import GitHubIcon from "./icons-svg/github-icon";
import InstaIcon from "./icons-svg/insta-icon";
import FbIcon from "./icons-svg/fb-icon";
import Close from "./icons-svg/close";
import Repeat from "./icons-svg/repeat";
import Trash from "./icons-svg/trash";
import Leave from "./icons-svg/leave";
import NotificationIcon from "./icons-svg/notification-icon";

export const Icon = (props) => {
  switch (props.name) {
    case "video":
      return <Video {...props} />;
    case "article":
      return <Read {...props} />;
    case "book":
      return <OnlineLearning {...props} />;
    case "course":
      return <OnlineCourse {...props} />;
    case "game":
      return <Gamepad {...props} />;
    case "other":
      return <Fitness {...props} />;
    case "application":
      return <Application {...props} />;
    case "empty-box":
      return <EmptyBox {...props} />;
    case "close":
      return <Close {...props} />;
    case "fb-icon":
      return <FbIcon {...props} />;
    case "insta-icon":
      return <InstaIcon {...props} />;
    case "github-icon":
      return <GitHubIcon {...props} />;
    case "vk-icon":
      return <VkIcon {...props} />;
    case "edit-edu":
      return <EditEdu {...props} />;
    case "edit-info":
      return <EditInfo {...props} />;
    case "edit-social":
      return <EditSocial {...props} />;
    case "edit-pen":
      return <EditPen {...props} />;
    case "lock-icon":
      return <LockIcon {...props} />;
    case "private-icon":
      return <PrivateIcon {...props} />;
    case "mail-icon":
      return <MailIcon {...props} />;
    case "settings":
      return <Settings {...props} />;
    case "accepted":
      return <Accepted {...props} />;
    case "camera":
      return <Camera {...props} />;

    case "webinar-no-data":
      return <WebinarNoData {...props} />;
    case "rating-star":
      return <RatingStar {...props} />;
    case "chevron-right":
      return <ChevronRight {...props} />;
    case "chevron-bottom":
      return <ChevronBottom {...props} />;
    case "trash":
      return <Trash {...props} />;
    case "repeat":
      return <Repeat {...props} />;
    case "leave":
      return <Leave {...props} />;
    case "notification-icon":
      return <NotificationIcon {...props} />;
    default:
      return <Video {...props} />;
  }
};
