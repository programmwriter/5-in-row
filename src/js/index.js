import '../scss/style.scss';
import {matrix, fillMatrix} from "./game-controller/game-controller";
import {addBtnsHandlers, renderField} from './render-controller/render-controller';
addBtnsHandlers()
fillMatrix();
renderField(matrix)













