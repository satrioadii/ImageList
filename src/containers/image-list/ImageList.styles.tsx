import { StyleSheet } from 'react-native';
import { StylesModel } from 'src/models';

const styles = StyleSheet.create({
  parentContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  emptyImageContainer: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImageText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
  },
  title: {
    color: StylesModel.colors.primary,
  },
  body: {
    color: StylesModel.colors.white,
  },
  buttonContainer: {
    width: '100%',
  },
});

export default styles;
