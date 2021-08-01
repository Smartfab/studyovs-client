import React, { useState } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
import 'draft-js/dist/Draft.css'
import styled from 'styled-components'

const Styles = styled.div`
  margin-bottom: 100px;
  .DraftEditor-root {
    line-height: 40px;
  }
`

export default function EditorReader({ body }) {
  const [editorState] = useState(EditorState.createWithContent(convertFromRaw(body)))
  return (
    <Styles>
      <Editor editorState={editorState} readOnly />
    </Styles>
  )
}
