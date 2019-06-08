import * as React from 'react'
import styled from 'styled-components'
import state from '@state'
import { Border, BoxShadow, FontSizeName } from '@src/interfaces/settings'
import { Colors } from '@src/styles'
import { ComponentStateMenu } from '@src/interfaces/ui'
import { Alignment, BoxNode, NodeTypes, ObjectFit, Overflow, RootNode, TextNode } from '@src/interfaces/nodes'
import { getSelectedElement } from '@src/selector'

const TopBarBox = styled.div`
  padding: 8px 16px;
  background: rgb(248, 248, 248);
  box-shadow: inset 0 -1px 0 0 rgb(0, 0, 0, 0.113);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  font-size: 24px;
  user-select: none;
`
const AlignRight = styled.div`
  margin-left: auto;
  display: flex;
`
const StateManagerWrapper = styled.div`
  position: absolute;
  top: 70px;
  left: 8px;
  padding-left: 8px;
  z-index: 99999;
  background: rgb(248, 248, 248);
  box-shadow: 0 10px 20px hsla(0, 0%, 0%, 0.15), 0 3px 6px hsla(0, 0%, 0%, 0.1);
  display: flex;
  align-items: center;
  font-size: 24px;
  user-select: none;
  height: 64px;
  border-radius: 5px;
  padding-right: 8px;
`
const StateText = styled.div`
  width: 100px;
  display: grid;
  justify-content: center;
`

const StylelessButton = styled.button.attrs({ type: 'button' })`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  cursor: pointer;
  outline: inherit;
`

const Divider = styled.div`
  width: 2px;
  align-self: stretch;
  background: #dfdfdf;
  border-radius: 5px;
  margin: 0 12px 0 8px;
`

const ColorBox = styled(StylelessButton)`
  width: 20px;
  height: 20px;
  margin-right: 4px;
  background: ${({ color }: any) => color};
  box-shadow: ${({ selected }) => (selected ? `0px 0 5px 1px ${Colors.accent}` : 'none')};
`

const HorizontalAlignmentWrapper = styled.div`
  cursor: pointer;
  display: grid;
  grid-template-columns: 6px 6px 6px;
  grid-template-rows: 18px;
  margin-right: 8px;
`

const VerticalAlignmentWrapper = styled.div`
  display: grid;
  grid-template-columns: 18px;
  grid-template-rows: 6px 6px 6px;
  margin-right: 8px;
`

const AlignmentItem = styled.div`
  background: ${Colors.grey200};
`

const AlignmentItemSelected = styled(AlignmentItem)`
  background: ${({ selected }) => (selected ? Colors.accent : Colors.grey500)};
`

const BorderBox = styled(StylelessButton)`
  border: ${({ border }) => border.style};
  border-radius: ${({ border }) => border.radius};
  background: ${({ selected }) => (selected ? Colors.accent : 'white')};
  margin-right: 4px;
  width: 20px;
  height: 20px;
`

interface BoxShadowProps {
  boxShadow: BoxShadow
}

const BoxShadowBox = styled(StylelessButton)`
  box-shadow: ${({ boxShadow }: BoxShadowProps) => boxShadow.value};
  background: ${({ selected }) => (selected ? Colors.accent : 'white')};
  margin-right: 4px;
  width: 20px;
  height: 20px;
`

const InfoColumn = styled.div`
  height: 48px;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
`

const IconRow = styled.div`
  margin: auto 0;
  display: flex;
  align-items: center;
`

const FontSize = styled.div`
  margin-right: 8px;
  font-size: 18px;
`

const moveLayer = (by: number) => () => {
  const node = state.ui.selectedNode
  const children = getSelectedElement().root.children
  const fromIndex = children.indexOf(node)
  const toIndex = fromIndex + by
  // out of bounds
  if (toIndex < 0 || toIndex > children.length) {
    return
  }
  children.splice(fromIndex, 1)
  children.splice(toIndex, 0, node)
}

const changeBackground = (colorId: string | null, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].backgroundColorId = colorId
    return
  }
  ;(state.ui.selectedNode as BoxNode).backgroundColorId = colorId
}
const changeFontColor = (colorId: string, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].fontColorId = colorId
    return
  }
  ;(state.ui.selectedNode as TextNode).fontColorId = colorId
}

const removeBorder = (stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].border = null
    return
  }
  ;(state.ui.selectedNode as BoxNode).border = null
}
const changeBorder = (border: Border, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].border = border.id
    return
  }
  ;(state.ui.selectedNode as BoxNode).border = border.id
}
const removeBoxShadow = (stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].boxShadow = null
    return
  }
  ;(state.ui.selectedNode as BoxNode).boxShadow = null
}
const changeBoxShadow = (boxShadow: BoxShadow, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].boxShadow = boxShadow.id
    return
  }
  ;(state.ui.selectedNode as BoxNode).boxShadow = boxShadow.id
}
const changeOverflow = (overflow: Overflow, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].overflow = overflow
    return
  }
  ;(state.ui.selectedNode as RootNode).overflow = overflow
}

const selectHorizontalAlignment = (alignment: Alignment, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].alignment = {
      ...state.ui.selectedNode[stateManager].alignment,
      horizontal: alignment,
    }
    return
  }
  state.ui.selectedNode.alignment.horizontal = alignment
}
const selectVerticalAlignment = (alignment: Alignment, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].alignment = {
      ...state.ui.selectedNode[stateManager].alignment,
      horizontal: alignment,
    }
    return
  }
  state.ui.selectedNode.alignment.vertical = alignment
}

/* const changeFontFamily = (fontFamily = string, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].fontFamily = fontFamily
    return
  }
  state.ui.selectedNode.fontFamily = fontFamily
} fix this nonsense?*/

const selectImage = (stateManager?: ComponentStateMenu) => () => {
  const images = state.settings.images

  const url = images[Math.floor(Math.random() * images.length)].url
  if (stateManager) {
    state.ui.selectedNode[stateManager].backgroundImageUrl = url
    return
  }
  ;(state.ui.selectedNode as BoxNode).backgroundImageUrl = url
}

const selectObjectFit = (objectFit: ObjectFit, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].backgroundImagePosition = objectFit
    return
  }
  ;(state.ui.selectedNode as BoxNode).backgroundImagePosition = objectFit
}
const changeFontSize = (size: FontSizeName, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].fontSize = size
    return
  }
  ;(state.ui.selectedNode as TextNode).fontSize = size
}
const changeFontFamily = (fontFamilyId: string, stateManager?: ComponentStateMenu) => () => {
  if (stateManager) {
    state.ui.selectedNode[stateManager].fontFamilyId = fontFamilyId
    return
  }
  ;(state.ui.selectedNode as TextNode).fontFamilyId = fontFamilyId
}

const changeState = (componentState: ComponentStateMenu) => () => {
  if (state.ui.stateManager === componentState) {
    state.ui.stateManager = null
    return
  }
  state.ui.stateManager = componentState
}

const changeGrid = () => {
  state.ui.showGrid = !state.ui.showGrid
}

interface MutatorProps {
  stateManager?: ComponentStateMenu
}
interface BoxMutatorProps {
  stateManager?: ComponentStateMenu
  component: BoxNode | RootNode
}

const BoxMutators = ({ component, stateManager }: BoxMutatorProps) => (
  <>
    <InfoColumn>
      <Title>Background Color</Title>
      <IconRow>
        <ColorBox
          selected={component.backgroundColorId === null}
          color="#ffffff"
          onClick={changeBackground(null, stateManager)}
        />
        {state.settings.colors.map(color => (
          <ColorBox
            key={color.id}
            selected={component.backgroundColorId === color.id}
            title={color.name}
            color={color.hex}
            onClick={changeBackground(color.id, stateManager)}
          />
        ))}
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Background Image</Title>
      <IconRow>
        <StylelessButton onClick={selectImage()}>Select image</StylelessButton>
        <StylelessButton onClick={selectObjectFit(ObjectFit.cover, stateManager)}>cover/</StylelessButton>
        <StylelessButton onClick={selectObjectFit(ObjectFit.contain, stateManager)}>contain/</StylelessButton>
        <StylelessButton onClick={selectObjectFit(ObjectFit.fill, stateManager)}>fill</StylelessButton>
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Borders</Title>
      <IconRow>
        <BorderBox
          title="None"
          border={{ style: 'none', radius: 'none' }}
          selected={component.border === null}
          onClick={removeBorder(stateManager)}
        />
        {state.settings.border.map(border => (
          <BorderBox
            key={border.id}
            selected={component.border === border.id}
            border={border}
            onClick={changeBorder(border, stateManager)}
          />
        ))}
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Box-Shadow</Title>
      <IconRow>
        <BoxShadowBox
          title="None"
          boxShadow={{ value: 'none' }}
          selected={component.boxShadow === null}
          onClick={removeBoxShadow(stateManager)}
        />
        {state.settings.boxShadow.map(boxShadow => (
          <BoxShadowBox
            key={boxShadow.id}
            selected={component.boxShadow === boxShadow.id}
            boxShadow={boxShadow}
            onClick={changeBoxShadow(boxShadow, stateManager)}
          />
        ))}
      </IconRow>
    </InfoColumn>
  </>
)
interface RootMutatorProps {
  stateManager?: ComponentStateMenu
  component: RootNode
}

const RootMutators = ({ component, stateManager }: RootMutatorProps) => (
  <>
    <BoxMutators component={component} stateManager={stateManager} />
    <Divider />
    <InfoColumn>
      <Title>Overflow</Title>
      <IconRow>
        <StylelessButton
          title="Visible"
          className="material-icons"
          style={{
            fontSize: '28px',
            color: component.overflow === Overflow.visible ? ' rgb(83, 212, 134)' : 'black',
          }}
          onClick={changeOverflow(Overflow.visible, stateManager)}
        >
          visibility
        </StylelessButton>
        <StylelessButton
          title="Hidden"
          className="material-icons"
          style={{
            fontSize: '28px',
            color: component.overflow === Overflow.hidden ? ' rgb(83, 212, 134)' : 'black',
          }}
          onClick={changeOverflow(Overflow.hidden, stateManager)}
        >
          visibility_off
        </StylelessButton>
      </IconRow>
    </InfoColumn>
  </>
)

interface TextMutatorProps {
  stateManager?: ComponentStateMenu
  component: TextNode
}

const TextMutators = ({ component, stateManager }: TextMutatorProps) => (
  <>
    <InfoColumn>
      <Title>Horizontal</Title>
      <IconRow>
        <StylelessButton title="Stretch" onClick={selectHorizontalAlignment(Alignment.stretch, stateManager)}>
          <HorizontalAlignmentWrapper>
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.stretch} />
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.stretch} />
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.stretch} />
          </HorizontalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Left" onClick={selectHorizontalAlignment(Alignment.start, stateManager)}>
          <HorizontalAlignmentWrapper>
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.start} />
            <AlignmentItem />
            <AlignmentItem />
          </HorizontalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Middle" onClick={selectHorizontalAlignment(Alignment.center, stateManager)}>
          <HorizontalAlignmentWrapper>
            <AlignmentItem />
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.center} />
            <AlignmentItem />
          </HorizontalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Right" onClick={selectHorizontalAlignment(Alignment.end, stateManager)}>
          <HorizontalAlignmentWrapper>
            <AlignmentItem />
            <AlignmentItem />
            <AlignmentItemSelected selected={component.alignment.horizontal === Alignment.end} />
          </HorizontalAlignmentWrapper>
        </StylelessButton>
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Vertical</Title>
      <IconRow>
        <StylelessButton title="Stretch" onClick={selectVerticalAlignment(Alignment.stretch, stateManager)}>
          <VerticalAlignmentWrapper>
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.stretch} />
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.stretch} />
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.stretch} />
          </VerticalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Top" onClick={selectVerticalAlignment(Alignment.start, stateManager)}>
          <VerticalAlignmentWrapper>
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.start} />
            <AlignmentItem />
            <AlignmentItem />
          </VerticalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Middle" onClick={selectVerticalAlignment(Alignment.center, stateManager)}>
          <VerticalAlignmentWrapper>
            <AlignmentItem />
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.center} />
            <AlignmentItem />
          </VerticalAlignmentWrapper>
        </StylelessButton>
        <StylelessButton title="Bottom" onClick={selectVerticalAlignment(Alignment.end, stateManager)}>
          <VerticalAlignmentWrapper>
            <AlignmentItem />
            <AlignmentItem />
            <AlignmentItemSelected selected={component.alignment.vertical === Alignment.end} />
          </VerticalAlignmentWrapper>
        </StylelessButton>
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Color</Title>
      <IconRow>
        {state.settings.colors.map(color => (
          <ColorBox
            key={color.id}
            selected={component.fontColorId === color.id}
            title={color.name}
            color={color.hex}
            onClick={changeFontColor(color.id, stateManager)}
          />
        ))}
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Font size</Title>
      <IconRow>
        <StylelessButton title="XS" onClick={changeFontSize(FontSizeName.XS, stateManager)}>
          <FontSize>XS</FontSize>
        </StylelessButton>
        <StylelessButton title="S" onClick={changeFontSize(FontSizeName.S, stateManager)}>
          <FontSize>S</FontSize>
        </StylelessButton>
        <StylelessButton title="M" onClick={changeFontSize(FontSizeName.M, stateManager)}>
          <FontSize>M</FontSize>
        </StylelessButton>
        <StylelessButton title="L" onClick={changeFontSize(FontSizeName.L, stateManager)}>
          <FontSize>L</FontSize>
        </StylelessButton>
        <StylelessButton title="XL" onClick={changeFontSize(FontSizeName.XL, stateManager)}>
          <FontSize>XL</FontSize>
        </StylelessButton>
      </IconRow>
    </InfoColumn>
    <InfoColumn>
      <Title>Font family</Title>
      <IconRow>
        {state.settings.fonts.map(font => (
          <StylelessButton key={font.id} title={font.fontFamily} onClick={changeFontFamily(font.id, stateManager)}>
            {font.fontFamily}
          </StylelessButton>
        ))}
      </IconRow>
    </InfoColumn>
  </>
)

interface IconMutatorProps {
  stateManager?: ComponentStateMenu
  component: TextNode
}

const IconMutators = ({ component, stateManager }: IconMutatorProps) => (
  <>
    <InfoColumn>
      <Title>Color</Title>
      <IconRow>
        {state.settings.colors.map(color => (
          <ColorBox
            key={color.id}
            selected={component.fontColorId === color.id}
            title={color.name}
            color={color.hex}
            onClick={changeFontColor(color.id, stateManager)}
          />
        ))}
      </IconRow>
    </InfoColumn>
    <Divider />
    <InfoColumn>
      <Title>Font size</Title>
      <IconRow>
        <StylelessButton title="XS" onClick={changeFontSize(FontSizeName.XS, stateManager)}>
          <FontSize>XS</FontSize>
        </StylelessButton>
        <StylelessButton title="S" onClick={changeFontSize(FontSizeName.S, stateManager)}>
          <FontSize>S</FontSize>
        </StylelessButton>
        <StylelessButton title="M" onClick={changeFontSize(FontSizeName.M, stateManager)}>
          <FontSize>M</FontSize>
        </StylelessButton>
        <StylelessButton title="L" onClick={changeFontSize(FontSizeName.L, stateManager)}>
          <FontSize>L</FontSize>
        </StylelessButton>
        <StylelessButton title="XL" onClick={changeFontSize(FontSizeName.XL, stateManager)}>
          <FontSize>XL</FontSize>
        </StylelessButton>
      </IconRow>
    </InfoColumn>
  </>
)

const ElementMutators = ({  }: IconMutatorProps) => <>Overrides</>

const Mutators = ({ stateManager }: MutatorProps) => {
  const component = stateManager
    ? { ...state.ui.selectedNode, ...state.ui.selectedNode[stateManager] }
    : state.ui.selectedNode
  if (state.ui.selectedNode.type === NodeTypes.Root) {
    return <RootMutators stateManager={stateManager} component={component} />
  }
  if (state.ui.selectedNode.type === NodeTypes.Element) {
    return <ElementMutators stateManager={stateManager} component={component} />
  }
  if (state.ui.selectedNode.type === NodeTypes.Box) {
    return <BoxMutators stateManager={stateManager} component={component} />
  }
  if (component.type === NodeTypes.Text) {
    return <TextMutators stateManager={stateManager} component={component} />
  }
  if (component.type === NodeTypes.Icon) {
    return <IconMutators stateManager={stateManager} component={component} />
  }
  return null
}

const TopBar = () => (
  <>
    <TopBarBox>
      {state.ui.selectedNode && state.ui.selectedNode.type !== NodeTypes.Root && (
        <>
          <InfoColumn>
            <Title>Z index</Title>
            <IconRow>
              <StylelessButton title="Move to front" className="material-icons" onClick={moveLayer(1)}>
                flip_to_front
              </StylelessButton>
              <StylelessButton title="Move to back" className="material-icons" onClick={moveLayer(-1)}>
                flip_to_back
              </StylelessButton>
            </IconRow>
          </InfoColumn>
          <Divider />
        </>
      )}

      {state.ui.selectedNode && <Mutators />}
      <AlignRight>
        <InfoColumn>
          <Title>Grid</Title>
          <IconRow>
            <StylelessButton
              title="Hovered"
              className="material-icons"
              style={{
                fontSize: '24px',
                marginLeft: '-2px',
                marginRight: '2px',
                color: state.ui.showGrid ? ' rgb(83, 212, 134)' : 'black',
              }}
              onClick={changeGrid}
            >
              {state.ui.showGrid ? 'grid_off' : 'grid_on'}
            </StylelessButton>
          </IconRow>
        </InfoColumn>
        {state.ui.selectedNode && (
          <>
            <Divider />
            <InfoColumn>
              <Title>State</Title>
              <IconRow>
                <StylelessButton
                  title="Hovered"
                  className="material-icons"
                  style={{
                    fontSize: '24px',
                    marginLeft: '-2px',
                    marginRight: '2px',
                    color: state.ui.stateManager === ComponentStateMenu.hover ? ' rgb(83, 212, 134)' : 'black',
                  }}
                  onClick={changeState(ComponentStateMenu.hover)}
                >
                  cloud
                </StylelessButton>
                <StylelessButton
                  title="Focused"
                  className="material-icons"
                  style={{
                    fontSize: '24px',
                    marginLeft: '-2px',
                    marginRight: '2px',
                    color: state.ui.stateManager === ComponentStateMenu.focus ? ' rgb(83, 212, 134)' : 'black',
                  }}
                  onClick={changeState(ComponentStateMenu.focus)}
                >
                  search
                </StylelessButton>
              </IconRow>
            </InfoColumn>
          </>
        )}
      </AlignRight>
    </TopBarBox>
    {state.ui.stateManager && state.ui.selectedNode && (
      <StateManagerWrapper>
        <Mutators stateManager={state.ui.stateManager} />
        <StateText>{state.ui.stateManager}</StateText>
      </StateManagerWrapper>
    )}
  </>
)

export default TopBar
