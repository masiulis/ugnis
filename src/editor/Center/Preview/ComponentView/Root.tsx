import state from '@state'
import styled from 'styled-components'
import { ComponentView, Node } from '@src/interfaces'
import * as React from 'react'
import Component from '@src/editor/Center/Preview/ComponentView/_Component'
import DragCorners from '@src/editor/Center/Preview/ComponentView/DragCorners'

const Rooty = styled.div`
  position: relative;
  transition: transform 0.3s;
  transform: ${() => (state.ui.componentView === ComponentView.Tilted ? `rotateY(30deg) rotateX(30deg)` : 'none')};
`

const selectRoot = (component: Node) =>
  function(e) {
    if (e.target.id === '_rootComponent') {
      state.ui.selectedNode = component
    }
  }

interface RootProps {
  component: Node
}
const RootComponent = ({ component }: RootProps) => (
  <Rooty
    id="_rootComponent"
    onClick={selectRoot(component)}
    style={{
      position: 'relative',
      width: component.size.width,
      height: component.size.height,
      background: component.background.color,
    }}
  >
    {component.children.map(component => (
      <Component key={component.id} component={component} />
    ))}
    <DragCorners component={component} />
  </Rooty>
)

export default RootComponent
