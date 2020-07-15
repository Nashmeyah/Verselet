class PoetsController < ApplicationController
  before_action :set_poet, only: [:show, :update, :destroy]

  # GET /poets
  def index
    poets = Poet.all

    render json: poets
  end

  
end
