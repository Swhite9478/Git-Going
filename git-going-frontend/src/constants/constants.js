export const constants = {
    ABOUT: 'About',
    REPOS: 'Repos',
    HOME: 'Home',
    REQUEST_REPO: 'Request a Repo',
    SIGNUP: 'Signup',
    LOGIN: 'Login',
    ACTIVATE: 'Activate',
    PLAIN_TEXT: { textDecoration: "none", color: "black" }
}

export const asPath = (constant) => {
    return constant === constants.HOME ? '/' : '/'.concat(constant).split(' ').join('_');
}