import Cookies from 'js-cookie';

export function createSession() {
    Cookies.set('zen-note-session', 'true');
}
