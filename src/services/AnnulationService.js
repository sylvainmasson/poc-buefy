import { DialogProgrammatic as Dialog } from 'buefy'

export default {
  annulation(from, to, next, changement, enregistrement) {
    if (changement && !enregistrement) {
      Dialog.confirm({
        title: 'Annulation',
        message:
          'Souhaitez vous vraiment abandonner ? Vous avez des modifications non sauvegardées.',
        confirmText: 'Oui',
        cancelText: 'Non',
        type: 'is-warning',
        hasIcon: true,
        onConfirm: () => next(),
        onCancel: () => next(false)
      })
    } else {
      next()
    }
  }
}
