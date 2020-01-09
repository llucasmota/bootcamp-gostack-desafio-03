import Bee from 'bee-queue';
import redisConfig from '../config/redis';
import SubscriptionMail from '../app/jobs/SubscriptionMail';

const jobs = [SubscriptionMail];

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
}

export default new Queue();
