import '../scss/style.scss';
import {matrix, fillMatrix} from "./game-controller";
import {addBtnsHandlers, renderField} from './render-controller';
addBtnsHandlers()
fillMatrix();
renderField(matrix)













