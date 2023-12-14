export default class Marketing {
  update({ id, userName }) {
    /**
     * Importante lembrar que o update é responsável por gerenciar seus errors/expections
     * Não deve ter await no notify porque a responsabilidade do notify é só emitir eventos
     * só notificar todo mundo
     */
    console.log(`[${id}]: [marketing] will send an welcome email to [${userName}]`)

  }
}