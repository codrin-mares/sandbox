import {v4 as uuid} from 'uuid';
import {IdType} from './models';

type Id = string;

interface UnknownId {
  _tag: 'unknown';
}

interface StaticId {
  _tag: 'static';
  value: Id;
}

interface InValueId<T> {
  _tag: 'inValue';
  value: keyof T;
}

interface ComposedId<T> {
  _tag: 'composed';
  value: (o: T) => Id;
}

export type ObjectId<T> = StaticId | InValueId<T> | ComposedId<T> | UnknownId;

export const unknownId = <T>(): ObjectId<T> => ({_tag: 'unknown'});

export const staticId = <T>(value: Id): ObjectId<T> => ({
  _tag: 'static',
  value,
});

export const inValueId = <T>(value: keyof T): ObjectId<T> => ({
  _tag: 'inValue',
  value,
});

export const composedId = <T>(value: (o: T) => Id): ObjectId<T> => ({
  _tag: 'composed',
  value,
});

export const foldObjectId = <T>(object: T, id: ObjectId<T>): Id => {
  switch (id._tag) {
    case 'static':
      return id.value;
    case 'inValue':
      return object[id.value] as unknown as Id;
    case 'composed':
      return id.value(object);
    case 'unknown':
      return uuid();
  }
};

export const applyId = <T>(o: T, idAdt: ObjectId<T>): IdType<T> => ({...o, id: foldObjectId(o, idAdt)});
