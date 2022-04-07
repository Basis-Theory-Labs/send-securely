interface Secret {
  id: string;
  ttl: number;
  data?: string;
}

interface CreateSecret {
  data: string;
  ttl: number;
}

export type { Secret, CreateSecret };
