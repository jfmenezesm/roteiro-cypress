describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });
    it('Marca uma tarefa como completa e verifica seu estado', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa para completar{enter}');

    // Verifica que o contador mostra 1 item antes de completar
    cy.get('.todo-count').should('contain.text', '1 item left');

    // Marca a tarefa como completa
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('[data-cy=toggle-todo-checkbox]')
      .click();

    // Verifica se a tarefa foi marcada como completa (riscada)
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.class', 'completed');

    // Verifica se o contador de itens restantes diminuiu para 0
    cy.get('.todo-count').should('contain.text', '0 items left');
  });

  it('Alterna o estado de todas as tarefas', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa 1{enter}');
    cy.get('[data-cy=todo-input]').type('Tarefa 2{enter}');
    cy.get('[data-cy=todo-input]').type('Tarefa 3{enter}');

    cy.get('label.toggle-all-label') // Seletor para o label do toggle all
      .click(); // Clica para marcar todas como completas

    cy.get('[data-cy=todos-list] > li')
      .each(($li) => {
        cy.wrap($li).should('have.class', 'completed'); // Verifica se todas estão completas
      });

    cy.get('.todo-count').should('contain.text', '0 items left'); // Deve ter 0 itens restantes

    cy.get('label.toggle-all-label')
      .click(); // Clica novamente para desmarcar todas

    cy.get('[data-cy=todos-list] > li')
      .each(($li) => {
        cy.wrap($li).should('not.have.class', 'completed'); // Verifica se todas estão ativas
      });

    cy.get('.todo-count').should('contain.text', '3 items left'); // Deve ter 3 itens restantes
  });

  it('Edita o texto de uma tarefa existente', () => {
    cy.visit('');
    cy.get('[data-cy=todo-input]').type('Tarefa para editar{enter}'); // Uma tarefa para testar edição

    const originalText = 'Tarefa para editar';
    const newText = 'Tarefa editada com sucesso';

    // Garante que a tarefa original existe e está visível
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', originalText)
      .dblclick(); // Duplo clique na tarefa para entrar no modo de edição

    // Limpa o texto existente e digita o novo texto no campo de edição
    cy.get('[data-cy=todos-list] > li')
      .first()
      .find('.edit') // Seletor para o campo de edição que aparece
      .clear()
      .type(newText + '{enter}'); // Digita o novo texto e pressiona Enter

    // Verifica se o texto da tarefa foi atualizado
    cy.get('[data-cy=todos-list] > li')
      .first()
      .should('have.text', newText);
  });
});