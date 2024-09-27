import CanvasConfig from "../Entity/CanvasConfig";

export interface Observer {
    update(config: CanvasConfig): void;
}


export class ObservableCanvasConfig {
  private observers: Observer[] = [];
  private config: CanvasConfig;
  
    constructor(config: CanvasConfig) {
      this.config = config;
    }
  
    addObserver(observer: Observer) {
        console.log("adding shape to observer")
      this.observers.push(observer);
    }
  
    removeObserver(observer: Observer) {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  
    notifyObservers() {
      this.observers.forEach((observer) => observer.update(this.config));
    }

    updateConfig(newConfig: CanvasConfig) {
      this.config = {...newConfig};
      this.notifyObservers();
    }
  
    // Method to get the current config
    getConfig() {
      return this.config;
    }
}
  