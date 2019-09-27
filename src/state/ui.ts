import { proxify } from 'lape'
import { parseUrl } from '@src/utils'
import { UI } from '@src/interfaces/ui'

const defaultState: UI = {
  router: parseUrl(),
  editingColorId: '',
  editingTextNode: null,
  addingElement: null,
  draggingNode: null,
  addingAtom: null,
  hoveredCell: null,
  selectedCell: null,
  selectedNode: null,
  selectedNodeToOverride: null,
  expandingNode: null,
  stateManager: null,
  showAddComponentMenu: false,
  showExportMenu: false,
  showGrid: false,
  zoom: 100,
  tilted: false,
}

export default proxify(defaultState)
