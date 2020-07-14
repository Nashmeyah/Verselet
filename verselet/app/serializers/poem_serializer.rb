class PoemSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  belongs_to :poet
end
