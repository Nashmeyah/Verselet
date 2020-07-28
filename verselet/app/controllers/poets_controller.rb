class PoetsController < ApplicationController
  before_action :set_poet, only: [:show, :update, :destroy]

  def index
    poets = Poet.all

    render json: poets
  end

  def create
    poet = Poet.new(poet_params)
    if poet.save
      render json: poet, status: :created
    else 
      render json: poem.errors, status: :unprocessable_entity
    end
  end

  def show
    render json: poet
  end

 private
    def set_poet
      poet = Poet.find(params[:id])
    end

    def poet_params
      params.require(:poet).permit(:name, :style)
    end
end
