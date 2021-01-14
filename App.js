import React, { useState } from 'react';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ProductsReducer from './store/reducers/ProductsReducer';
import DarkModeReducer from './store/reducers/DarkModeReducer';
import CartReducer from './store/reducers/CartReducer';
import OrdersReducer from './store/reducers/OrdersReducer';
import WishlistReducer from './store/reducers/WishlistReducer';
import AuthReducer from './store/reducers/AuthReducer';
import UserReducer from './store/reducers/UserReducer';
import ReviewsReducer from './store/reducers/ReviewsReducer';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import ReduxThunk from 'redux-thunk';
import Container from './components/SharedComponents/Atomic/Container';
import RootNavigator from './navigation/RootNavigator';

enableScreens();

const fetchFont = () => {
  return Fonts.loadAsync({
    'open-sans-r': require('./constants/fonts/OpenSans-Regular.ttf'),
    'open-sans-m': require('./constants/fonts/OpenSans-SemiBold.ttf'),
    'open-sans-b': require('./constants/fonts/OpenSans-Bold.ttf'),
    'good-times': require('./constants/fonts/good-times.ttf'),
  });
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return (<AppLoading startAsync={fetchFont} onFinish={() => setFontLoaded(true)} />);
  }

  const rootReducer = combineReducers({
    products: ProductsReducer,
    darkMode: DarkModeReducer,
    cart: CartReducer,
    orders: OrdersReducer,
    wishlist: WishlistReducer,
    auth: AuthReducer,
    user: UserReducer,
    reviews: ReviewsReducer,
  }
  );

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Container>
          <RootNavigator />
        </Container>
      </NavigationContainer>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
}