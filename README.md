// Eduarda dos Santos
// Disciplina: Algoritmos e Estruturas de Dados II

__Desafio:__

Foi proposto a implementação de um programa para calcular os caminhos mínimos entre os vértices de um grafo utilizando o algoritmo de dijsktra seguindo as seguintes regras:
- Permitir o armazenamento de até 20 vértices.
- Fazer a leitura dos pesos das arestas de cada vértice.
- Considerar sempre vértices positivos.
- Mostrar o caminho mínimo entre dois vértices solicitados.

__Implementação do código:__
No código, a lógica segue o algoritmo de Dijkstra: começa definindo as distâncias iniciais como infinito, exceto para o vértice inicial, que é 0. Em seguida, encontra o vértice não visitado com a menor distância e o marca como visitado.
Para cada vizinho desse vértice, verifica se a distância atual pode ser reduzida passando por ele; se sim, atualiza a distância e registra o vértice anterior no caminho. Esse processo se repete até que todos os vértices acessíveis sejam processados. 
Por fim, o caminho mínimo é reconstruído usando os predecessores armazenados.
