/**
 * evolver - A genetic algorithm / evolutionary computation library
 * Fork of EvoMap/evolver
 *
 * Main entry point
 */

'use strict';

const Population = require('./population');
const Individual = require('./individual');
const selection = require('./selection');
const crossover = require('./crossover');
const mutation = require('./mutation');

/**
 * Create and run an evolutionary algorithm with the given configuration.
 *
 * @param {Object} options - Configuration options
 * @param {number} options.populationSize - Number of individuals in the population (default: 100)
 * @param {number} options.generations - Maximum number of generations to run (default: 100)
 * @param {Function} options.fitness - Fitness function that takes an individual and returns a numeric score
 * @param {Function} options.generate - Function that generates a random individual's genome
 * @param {number} [options.mutationRate=0.01] - Probability of mutation per gene
 * @param {number} [options.crossoverRate=0.7] - Probability of crossover between two parents
 * @param {string} [options.selectionMethod='tournament'] - Selection strategy: 'tournament', 'roulette', or 'rank'
 * @param {Function} [options.onGeneration] - Callback invoked at the end of each generation
 * @param {Function} [options.stopCondition] - Optional function returning true to halt evolution early
 * @returns {Object} Result object containing the best individual and final population
 */
function evolver(options = {}) {
  const config = {
    populationSize: options.populationSize || 100,
    generations: options.generations || 100,
    mutationRate: options.mutationRate !== undefined ? options.mutationRate : 0.01,
    crossoverRate: options.crossoverRate !== undefined ? options.crossoverRate : 0.7,
    selectionMethod: options.selectionMethod || 'tournament',
    fitness: options.fitness,
    generate: options.generate,
    onGeneration: options.onGeneration || null,
    stopCondition: options.stopCondition || null,
  };

  if (typeof config.fitness !== 'function') {
    throw new Error('evolver: options.fitness must be a function');
  }
  if (typeof config.generate !== 'function') {
    throw new Error('evolver: options.generate must be a function');
  }

  // Initialize population
  let population = new Population(config.populationSize, config.generate, config.fitness);
  population.evaluate();

  let best = population.fittest();
  let generation = 0;

  while (generation < config.generations) {
    generation++;

    // Selection
    const selected = selection[config.selectionMethod](population);

    // Crossover & Mutation to produce next generation
    const nextGen = [];
    while (nextGen.length < config.populationSize) {
      const parentA = selected[Math.floor(Math.random() * selected.length)];
      const parentB = selected[Math.floor(Math.random() * selected.length)];

      let childGenome;
      if (Math.random() < config.crossoverRate) {
        childGenome = crossover.singlePoint(parentA.genome, parentB.genome);
      } else {
        childGenome = [...parentA.genome];
      }

      childGenome = mutation.flip(childGenome, config.mutationRate);
      nextGen.push(new Individual(childGenome, config.fitness));
    }

    population = new Population(config.populationSize, null, config.fitness, nextGen);
    population.evaluate();

    const currentBest = population.fittest();
    if (currentBest.score > best.score) {
      best = currentBest;
    }

    if (config.onGeneration) {
      config.onGeneration({ generation, best, population });
    }

    if (config.stopCondition && config.stopCondition({ generation, best, population })) {
      break;
    }
  }

  return {
    best,
    population,
    generations: generation,
  };
}

module.exports = evolver;
module.exports.Population = Population;
module.exports.Individual = Individual;
module.exports.selection = selection;
module.exports.crossover = crossover;
module.exports.mutation = mutation;
