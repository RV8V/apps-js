const R = require('ramda')

/** @: Using a law to help remove double iteration */

const apps = [
  {
    name: 'app',
    link: '/app',
    children: [
      { name: 'child-1', link: '/app/child-1' },
      { name: 'child-2', link: '/app/child-2' }
    ]
  },
  {
    name: 'other-app',
    link: '/other-app',
    children: [
      { name: 'child-1', link: '/other/app/child-1' },
      { name: 'child-2', link: '/other/app/child-2' },
      { name: 'child-3', link: '/other/app/child-3' }
    ]
  },
]

const pannels = {
  'child-1': 'pannel for child-1',
  'child-2': 'pannel for child-2',
  'child-3': 'pannel for child-3',
}

const panelRoute = child => ({ link: child.link, panel: child.panel, path: '' })

const getPanel = child => ({ link: child.link, panel: pannels[child.name] })

const panelRoutesBad = R.compose(R.map(panelRoute), R.map(getPanel), R.chain(R.prop('children')))

console.log({ panelRoutesBad: panelRoutesBad(apps) })

/** @: here we map over list twice */
/** @: Functor law: */
/** @: compose(map(f), map(g)) === map(commpse(f, g)) */

/** @: f is panelRoute, g is getPanel */

const childToPanelRoute = R.compose(panelRoute, getPanel)
const panelRoutesGood = R.compose(R.map(childToPanelRoute), R.chain(R.prop('children')))

console.log({ panelRoutesGood: panelRoutesGood(apps) })

/*********************************************/

console.dir({
  map: R.map(R.prop('children'), apps),
  chain: R.chain(R.prop('children'), apps)
}, {
  depth: 5
})

/*********************************************/

const arr = [1, 2, 3, 4]
const mappedArr = arr.map(n => [n + n])
const chainedArr = R.chain(n => [n + n], arr)

console.log({ mappedArr, chainedArr })
