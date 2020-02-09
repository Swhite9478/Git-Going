export const constants = {
    ABOUT: 'About',
    REPOS: 'Repos',
    HOME: '',
    REQUEST_REPO: 'Request a Repo',
    SIGNUP: 'Signup',
    LOGIN: 'Login',
    ACTIVATE: 'Activate'
}

export const asPath = (constant) => {
    return '/'.concat(constant).split(' ').join('_');
}