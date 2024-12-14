/* 
No código, a lógica segue o algoritmo de Dijkstra: começa definindo as distâncias iniciais como infinito, exceto para o vértice inicial que é 0. 
Em seguida, encontra o vértice não visitado com a menor distância e o marca como visitado. Para cada vizinho desse vértice, verifica se a distância 
atual pode ser reduzida passando por ele, se sim, atualiza a distância e registra o vértice anterior no caminho. Esse processo se repete até que todos 
os vértices acessíveis sejam processados. Por fim, o caminho mínimo é reconstruído usando os predecessores armazenados.
*/
class Graph {
    constructor(maxVertices = 20) {
        this.maxVertices = maxVertices;
        this.vertices = [];
        this.adjacencyMatrix = Array.from({ length: maxVertices }, () =>
            Array(maxVertices).fill(Infinity)
        );
    }

    addVertex(vertex) {
        if (this.vertices.length >= this.maxVertices) {
            console.log("Limite máximo de vértices atingido!");
            return;
        }

        if (this.vertices.includes(vertex)) {
            console.log("Vértice já existe!");
            return;
        }

        this.vertices.push(vertex);
        console.log(`Vértice '${vertex}' adicionado com sucesso!`);
    }

    addEdge(vertex1, vertex2, weight) {
        if (weight <= 0) {
            console.log(`Erro: O peso deve ser positivo! Aresta '${vertex1} <-> ${vertex2}' não foi criada.`);
            return;
        }

        const index1 = this.vertices.indexOf(vertex1);
        const index2 = this.vertices.indexOf(vertex2);

        if (index1 === -1 || index2 === -1) {
            console.log("Um ou ambos os vértices não existem.");
            return;
        }

        this.adjacencyMatrix[index1][index2] = weight;
        this.adjacencyMatrix[index2][index1] = weight; // Para grafo não direcionado
        console.log(`Aresta adicionada: ${vertex1} <-> ${vertex2} com peso ${weight}`);
    }

    printAdjacencyMatrix() {
        console.log("Matriz de Adjacência:");
        console.log("   ", this.vertices.join(" "));
        for (let i = 0; i < this.vertices.length; i++) {
            const row = this.adjacencyMatrix[i]
                .slice(0, this.vertices.length)
                .map(weight => (weight === Infinity ? "∞" : weight));
            console.log(this.vertices[i], row.join(" "));
        }
    }

    readEdges(vertex) {
        const index = this.vertices.indexOf(vertex);
        if (index === -1) {
            console.log(`Vértice '${vertex}' não encontrado!`);
            return;
        }

        console.log(`Pesos das arestas conectadas ao vértice '${vertex}':`);
        for (let i = 0; i < this.vertices.length; i++) {
            if (this.adjacencyMatrix[index][i] !== Infinity) {
                console.log(`  - Para '${this.vertices[i]}': Peso ${this.adjacencyMatrix[index][i]}`);
            }
        }
    }

    findShortestPath(startVertex, endVertex) {
        const startIndex = this.vertices.indexOf(startVertex);
        const endIndex = this.vertices.indexOf(endVertex);

        if (startIndex === -1 || endIndex === -1) {
            console.log("Um ou ambos os vértices não existem!");
            return;
        }

        const distances = Array(this.vertices.length).fill(Infinity);
        const visited = Array(this.vertices.length).fill(false);
        const previous = Array(this.vertices.length).fill(null);

        distances[startIndex] = 0;

        for (let i = 0; i < this.vertices.length; i++) {
            let minDistance = Infinity;
            let currentVertex = -1;

            for (let j = 0; j < this.vertices.length; j++) {
                if (!visited[j] && distances[j] < minDistance) {
                    minDistance = distances[j];
                    currentVertex = j;
                }
            }

            if (currentVertex === -1) break;

            visited[currentVertex] = true;

            for (let neighbor = 0; neighbor < this.vertices.length; neighbor++) {
                if (this.adjacencyMatrix[currentVertex][neighbor] !== Infinity && !visited[neighbor]) {
                    const newDistance = distances[currentVertex] + this.adjacencyMatrix[currentVertex][neighbor];
                    if (newDistance < distances[neighbor]) {
                        distances[neighbor] = newDistance;
                        previous[neighbor] = currentVertex;
                    }
                }
            }
        }

        const path = [];
        let currentIndex = endIndex;

        while (currentIndex !== null) {
            path.unshift(this.vertices[currentIndex]);
            currentIndex = previous[currentIndex];
        }

        if (distances[endIndex] === Infinity) {
            console.log(`Não há caminho entre '${startVertex}' e '${endVertex}'.`);
        } else {
            console.log(`Caminho mínimo entre '${startVertex}' e '${endVertex}': ${path.join(" -> ")} (Distância: ${distances[endIndex]})`);
        }
    }
}

const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addVertex("E");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "C", 1);
graph.addEdge("B", "D", 5);
graph.addEdge("C", "D", 8);
graph.addEdge("C", "E", 10);
graph.addEdge("D", "E", 2);

graph.printAdjacencyMatrix();
graph.findShortestPath("A", "E");
graph.findShortestPath("A", "D");
