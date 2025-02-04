import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import SubscriptionMail from '../app/jobs/SubscriptionMail';
import HelpOrderMail from '../app/jobs/HelpOrderMail';

const jobs = [SubscriptionMail, HelpOrderMail];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }
  add(queue, job) {
    /**
     * bee é referente a propriedade que é enviada
     * pelo método init
     */
    return this.queues[queue].bee.createJob(job).save();
  }
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.hadleFailure).process(handle);
    });
  }
  hadleFailure(job, err) {
    console.log(`Queue ${job.queue.name}, Erro: ${err}`);
  }
}

export default new Queue();
