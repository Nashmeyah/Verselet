class PoemsController < ApplicationController
  before_action :set_poem, only: [:show, :update, :destroy]

  # GET /poems
  def index
    poems = Poem.all

    render json: poems
  end

  
end
