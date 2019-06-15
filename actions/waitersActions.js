import * as actions from './actionTypes';

export const agregarItemMenu = dispatch => (item, price, currentContents) => { // esto significa que recibe "dispatch" primero
    const newContent = currentContents;
    for (let i = 0; i < newContent.length; i += 1) {
        if (newContent[i].itemName === item) {
            newContent[i].quantity += 1;
            dispatch({
                type: actions.AGREGAR_ITEM_MENU,
                payload: {
                    contents: newContent,
                    price: price,
                }
            })

            return;
        }
    }
    newContent.push({
        itemName: item,
        price: price,
        quantity: 1
    });

    dispatch({
        type: actions.AGREGAR_ITEM_MENU,
        payload: {
            contents: newContent,
            price: price,
        }
    });
};

export const fillMenu = dispatch => menuContents => {
    dispatch({
        type: actions.FILL_BQMENU,
        payload: menuContents
    })
}