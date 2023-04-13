export const SET_LOCALE = 'SET_LOCALE';
export const FETCH_LOCALE = 'FETCH_LOCALE';


// запрос на сервер на изменение настроек пользователя, а именно изменение языка приложения
export const setLocalization = (localization) => {
    return {
        type: SET_LOCALE,
        payload: localization
    };
};

// запрос на сервер на загрузку с бд
export const fetchLocalization = () => {
    return (dispatch) => {
        fetch('http://localhost:3000/localization')
            .then(response => response.json())
            .then(data => {
                dispatch({type: FETCH_LOCALE, payload: data})
            })
            .catch(err => console.log("Smth went wrong"));
    };
};
