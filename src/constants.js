export const ACTIVATION_CODE_TIMEOUT = 10 * 60 * 1000;  // 10 min

export const SOLUTION_STATE = {
    CHECKING: 0,
    ERROR: 1,
    OK: 2,
    COMPILES: 3,
    COMPILED_WITH_ERROR: 4,
};

export const CHOICES = {
    PUBLIC: 'best_public',
    PRIVATE: 'best_private',
    USER: 'user_choice',
};

export const MY_TRACKER_ID = 3208529;

export const TRACKER_GOALS = {
    OPEN_SIGNUP_MODAL: 'open_signup_modal',
    OPEN_LOGIN_MODAL: 'open_login_modal',
    LOGIN: 'login',
    SIGNUP: 'signup',
    ACTIVATION: 'activation',
    OPEN_FAQ: 'open_faq',
    OPEN_TASKS_LIST: 'open_tasks_list',
    OPEN_TASK_DESCRIPTION: 'open_task_description',
    OPEN_TASK_UPLOAD: 'open_task_upload',
    OPEN_TASK_RATING: 'open_task_rating',
}

export const VK = 'vk-oauth2';
export const FACEBOOK = 'facebook';
export const GITHUB = 'github';
export const INSTAGRAM = 'instagram';

export const SOCIALS = [
    {
        id: 16,
        provider: VK,
        iconName: 'vk-icon',
    },
    {
        id: 13,
        provider: FACEBOOK,
        iconName: 'fb-icon',
    },
    {
        id: 19,
        provider: GITHUB,
        iconName: 'github-icon',
    },
    {
        id: 26,
        provider: INSTAGRAM,
        iconName: 'insta-icon',
    },
];