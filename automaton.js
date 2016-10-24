const { mkdir, writeFile, appendFile } = require('fs')
const args = process.argv.slice(2, process.argv.length)

if (args.length === 0) {
  console.log(
`Provide component type
  cc: const Name = React.createClass ...
  sf: const Name = () => ...
  ec: const Name extends Component ...
  pr: const Name extends PureComponent ...
`)
} else if (args.length === 1) {
  console.log('Provide component name')
} else {
  const type = args[0]
  const name = args[1]

  const cc =
`import React from 'react'

const ${name} = React.createClass({
  render() {
    return (
      <div></div>
    )
  }
})

export default ${name}
`

  const sf =
`import React from 'react'

const ${name} = (props) =>
  <div></div>

export default ${name}
`

  const ec =
`import React, { Component } from 'react'

class ${name} extends Component {
  render() {
    return (
      <div></div>
    )
  }
}

export default ${name}
`

  const pr =
`import React, { PureComponent } from 'react'

class ${name} extends PureComponent {
  render() {
    return (
      <div></div>
    )
  }
}

export default ${name}
`

  const variant = { cc, sf, ec, pr }

  mkdir(
    `src/components/${name}`,
    dirErr => dirErr
      ? console.log(dirErr)
      : writeFile(
        `src/components/${name}/${name}.js`,
        variant[type],
        fileErr => fileErr
          ? console.log(fileErr)
          : appendFile(
            `src/components/index.js`,
            `\nexport ${name} from './${name}/${name}'`,
            exportErr => exportErr
              ? console.log(exportErr)
              : console.log(`Component ${name} created`)
            )
        )
  )
}
