const Errors = {
  PASSENGER_ALREADY_HAS_ACTIVE_RIDE: 'Passageiro já possui uma corrida ativa.',
  DRIVER_ALREADY_HAS_ACTIVE_RIDE: 'Motorista já possui uma corrida ativa.',

  RIDE_NOT_FOUND: 'Corrida não encontrada na base de dados.',
  RIDE_NOT_IN_REQUESTED_STATUS: 'Corrida não está no status requested.',
  RIDE_NOT_IN_ACCEPTED_STATUS: 'Corrida não está no status accepted.',
  RIDE_ALREADY_HAS_DRIVER: 'Não é possível aceitar a corrida. Ela já possui um motorista.',
  RIDE_NOT_IN_PROGRESS: 'Corrida não está no status inProgress.',
  RIDE_NOT_IN_IN_PROGRESS_STATUS: 'Corrida não está no status inProgress.',

  POSITION_NOT_FOUND: 'Posição não encontrada na base de dados.',
};

export { Errors };
