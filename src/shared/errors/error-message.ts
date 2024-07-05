const Errors = {
  ACCOUNT_NOT_FOUND: 'Conta não encontrada na base de dados.',
  ACCOUNT_NOT_PASSENGER_TYPE: 'Somente passageiros podem solicitar corridas.',
  ACCOUNT_NOT_DRIVE_TYPE: 'Somente motoristas podem aceitar/iniciar corridas.',
  EMAIL_ALREADY_IN_USE: 'O email informado já está sendo utilizado.',

  PASSENGER_ALREADY_HAS_ACTIVE_RIDE: 'Erro. Passageiro já possui uma corrida em andamento.',
  DRIVER_ALREADY_HAS_ACTIVE_RIDE: 'Erro. Motorista já possui uma corrida em andamento.',

  RIDE_NOT_FOUND: 'Corrida não encontrada na base de dados.',
  RIDE_NOT_IN_REQUESTED_STATUS: 'Corrida não está no status requested.',
  RIDE_NOT_IN_ACCEPTED_STATUS: 'Corrida não está no status accepted.',
};

export { Errors };
