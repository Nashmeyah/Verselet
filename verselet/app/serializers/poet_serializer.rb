class PoetSerializer < ActiveModel::Serializer
  attributes :id, :name, :style
  has_many :poems
end
