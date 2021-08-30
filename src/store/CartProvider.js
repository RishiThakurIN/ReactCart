import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState={
    items:[],
    totalAmount:0
};

const cartReducer=(state,action)=>{
    if(action.type==='ADD'){
        const updatedTotalAmout=state.totalAmount+action.item.price*action.item.amount;
        const existingCartItemIndex=state.items.findIndex(item=>item.id===action.item.id);
        const existingCartItem=state.items[existingCartItemIndex];
        let updatedItems;
        
        if(existingCartItem){
           const updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+action.item.amount
            };
            updatedItems=[...state.items];
            updatedItems[existingCartItemIndex]=updatedItem;
        }else{            
            updatedItems=state.items.concat(action.item);
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmout
        };
    }
    if(action.type==='REMOVE'){
        console.log(...state.items);
        const existingCartItemIndex=state.items.findIndex((item)=>item.id===action.id);
        console.log(existingCartItemIndex);
        const existingItem=state.items[existingCartItemIndex];
        console.log('CartProvider ln-35 : '+existingItem);
        const updatedTotalAmount=state.totalAmount-existingItem.price;
        let updatedItems;
        if(existingItem.amount===1){
            updatedItems=state.items.filter(item=>item.id!==action.id);    
            console.log('CartProvider ln-42 : '+updatedItems); 
        }else{
            const updatedItem={...existingItem,amount:existingItem.amount-1};            
            console.log(updatedItem);
            updatedItems=[...state.items];
            console.log(updatedItems);
            updatedItems[existingCartItemIndex]=updatedItem;            
            console.log(updatedItems);            
        }

        return {
            items:updatedItems,
            totalAmount:updatedTotalAmount
        }
    }
    return defaultCartState;
};

const CartProvider=props=>{
    const [cartState,dispatchCartAction]=useReducer(cartReducer,defaultCartState);

    const addItemToCartHandler=(item)=>{
        dispatchCartAction({type:'ADD',item:item});
    };
    
    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type:'REMOVE',id:id});
    };
    
    const cartContext={
        items:cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem:removeItemFromCartHandler
    };
    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
};
export default CartProvider;