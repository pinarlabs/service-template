interface Readiness {
    name: string;
    ready: boolean;
    services?: Readiness[];
  }
  
  export default Readiness;
  