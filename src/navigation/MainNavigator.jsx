import { useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import ShopStack from './ShopStack'

export default function MainNavigator() {
  const { localId } = useSelector((state) => state.user.user)

  return localId ? <ShopStack /> : <AuthNavigator />
}