export async function access(url, settings) {
    const domain = 'http://localhost:4000';
    return await fetch(domain + url, settings);
}

export async function access_or_login(url, settings, navigate) {
    const token = "Bearer" + localStorage.getItem('access');

    if ('headers' in settings) {
        settings.headers['Authorization'] = token;
    } else {
        settings['headers'] = {
            Authorization: token,
        };
    }

    const response = await access(url, settings);
    switch (response.status) {
        case 401:
        case 403:
            navigate('/signin/');
            break;
        default:
            break;
    }

    return response;
}