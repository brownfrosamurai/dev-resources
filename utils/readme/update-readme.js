const resourcesList = require('../../db/resources-list')
const createTree = require('./create-tree')
const createIndex = require('./create-index')
const createTables = require('./create-tables')
const writeToFile = require('../write-to-file')

const url = 'https://devresourc.es/?ref=github-readme'

const logo = `<a href="${url}"><p align="center"><img width="5000" src="./public/assets/images/logo-with-bg.png" /></p></a>\n\n`

const description = `The list and public API of the resources that power [Dev Resources](${url}).\n\n`

const contributionGuide = 'For information on contributing, please see the [contributing guide](CONTRIBUTING.md).\n\n'

const usageGuide = 'For information on using the public API, please see the [API usage guide](API_USAGE.md).\n\n'

const resourcesCount = `### Total resources: ${resourcesList.length}\n\n`

async function updateReadme() {
    try {
        const resourcesTree = createTree(resourcesList)
        const index = createIndex(resourcesTree)
        const tables = createTables(resourcesTree)

        await writeToFile({
            data: `${logo} ${description} ${contributionGuide} ${usageGuide} ${resourcesCount} ${index} ${tables}`,
            filePath: './README.md',
        })
    } catch (error) {
        throw new Error(error)
    }
}

updateReadme()
