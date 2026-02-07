class NetworkService {
  constructor() {
    this.isOnline = navigator.onLine;
    this.listeners = [];
    this.init();
  }

  init() {
    window.addEventListener('online', () => this.handleOnline());
    window.addEventListener('offline', () => this.handleOffline());
  }

  handleOnline() {
    this.isOnline = true;
    console.log('Internet aloqasi tiklandi');
    this.notifyListeners(true);
  }

  handleOffline() {
    this.isOnline = false;
    console.log('Internet aloqasi uzildi');
    this.notifyListeners(false);
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  notifyListeners(status) {
    this.listeners.forEach(callback => callback(status));
  }

  getStatus() {
    return this.isOnline;
  }

  async checkConnection() {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch('https://api.open-meteo.com/v1/status', {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export default new NetworkService();
