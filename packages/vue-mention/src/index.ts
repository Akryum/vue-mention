import Mentionable from './Mentionable.vue'

export {
  Mentionable,
}

function registerComponents (app, prefix) {
  app.component(`${prefix}mentionable`, Mentionable)
  app.component(`${prefix}Mentionable`, Mentionable)
}

export function install (app, options) {
  const finalOptions = Object.assign({}, {
    installComponents: true,
    componentsPrefix: '',
  }, options)

  if (finalOptions.installComponents) {
    registerComponents(app, finalOptions.componentsPrefix)
  }
}

const plugin = {
  // eslint-disable-next-line no-undef
  version: VERSION,
  install,
}

export default plugin
